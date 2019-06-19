/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.HuanKuDao;
import com.lb.lbstore.domain.HuanKu;
import com.lb.lbstore.service.HuanKuService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("huanKuServiceImpl")
public class HuanKuServiceImpl implements HuanKuService {

    @Autowired
    private HuanKuDao huanKuDao;

    @Override
    public HuanKu getHuanKuById(Integer id) {
        return (HuanKu) huanKuDao.findObjectById(HuanKu.class, id);
    }

    @Override
    public HuanKu getHuanKuDetailById(Integer id) {
        return huanKuDao.getHuanKuDetailById(id);
    }

    @Override
    public boolean updateHuanKu(HuanKu huanKu) {
        return huanKuDao.updateHuanKu(huanKu);
    }

    @Override
    public HuanKu saveHuanKu(HuanKu huanKu) {
        int id = huanKuDao.saveHuanKu(huanKu);
        return (HuanKu) huanKuDao.findObjectById(HuanKu.class, id);
    }

    @Override
    public boolean deleteHuanKu(Integer id) {
        return huanKuDao.deleteHuanKu(id);
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from HuanKu where qy_id=?";
        if (map.containsKey("ck_id")) {
            sql += " and ck_id = ?";
            parameters.add(map.get("ck_id"));
        }
        if (map.containsKey("lsh")) {
            sql += " and lsh like '%?%'";
            parameters.add(map.get("lsh"));
        }
        if (map.containsKey("wz")) {
            sql += " and wz like '%?%'";
            parameters.add(map.get("wz"));
        }
        if (map.containsKey("state")) {
            sql += " and state = ?";
            parameters.add(map.get("state"));
        }
        if (map.containsKey("kh_id")) {
            sql += " and kh_id = ?";
            parameters.add(map.get("kh_id"));
        }
        if (map.containsKey("gys_id")) {
            sql += " and gys_id = ?";
            parameters.add(map.get("gys_id"));
        }
        if (map.containsKey("qrq")) {
            sql += " and sj >= '?'";
            parameters.add(map.get("qrq"));
        }
        if (map.containsKey("zrq")) {
            sql += " and sj <= '?'";
            parameters.add(map.get("zrq") + " 23:59:59");
        }
        return huanKuDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<HuanKu> queryHuanKusByPage(HashMap map) {
        return huanKuDao.queryHuanKusByPage(map);
    }

    @Override
    public String dealHuanKu(HuanKu huanKu, Integer a01_id) {
        return huanKuDao.dealHuanKu(huanKu, a01_id);
    }

}
