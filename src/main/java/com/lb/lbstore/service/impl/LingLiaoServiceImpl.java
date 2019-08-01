/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.LingLiaoDao;
import com.lb.lbstore.domain.LingLiao;
import com.lb.lbstore.domain.LingLiaoDetail;
import com.lb.lbstore.service.LingLiaoService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("lingLiaoServiceImpl")
public class LingLiaoServiceImpl implements LingLiaoService {

    @Autowired
    private LingLiaoDao lingLiaoDao;

    @Override
    public LingLiao getLingLiaoById(Integer id) {
        return (LingLiao) lingLiaoDao.findObjectById(LingLiao.class, id);
    }

    @Override
    public LingLiao getLingLiaoWithDetailById(Integer id) {
        return lingLiaoDao.getLingLiaoWithDetailById(id);
    }

    @Override
    public LingLiaoDetail getLingLiaoDetailById(Integer id) {
        return lingLiaoDao.getLingLiaoDetailById(id);
    }

    @Override
    public List<LingLiao> getAllLingLiaos(Integer qy_id) {
        List parameters = new ArrayList();
        parameters.add(qy_id);
        return lingLiaoDao.getResult("from LingLiao lingLiao where qy_id=?", parameters.toArray());
    }

    @Override
    public boolean updateLingLiao(LingLiao lingLiao) {
        return lingLiaoDao.updateLingLiao(lingLiao);
    }

    @Override
    public LingLiao saveLingLiao(LingLiao lingLiao) {
        int id = lingLiaoDao.saveLingLiao(lingLiao);
        return (LingLiao) lingLiaoDao.findObjectById(LingLiao.class, id);
    }

    @Override
    public boolean deleteLingLiao(Integer id) {
        return lingLiaoDao.deleteLingLiao(id);
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from LingLiao where qy_id=?";
        if (map.containsKey("xmd_id")) {
            sql += " and xmd_id = ?";
            parameters.add(map.get("xmd_id"));
        }
        if (map.containsKey("ck_id")) {
            sql += " and ck_id = ?";
            parameters.add(map.get("ck_id"));
        }
        if (map.containsKey("lsh")) {
            sql += " and lsh like ?";
            parameters.add("%" + map.get("lsh") + "%");
        }
        if (map.containsKey("wz")) {
            sql += " and wz like ?";
            parameters.add("%" + map.get("wz") + "%");
        }
        if (map.containsKey("dh")) {
            sql += " and dh = ?";
            parameters.add(map.get("dh"));
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
            sql += " and sj >= ?";
            parameters.add(map.get("qrq"));
        }
        if (map.containsKey("zrq")) {
            sql += " and sj <= ?";
            parameters.add(map.get("zrq") + " 23:59:59");
        }
        return lingLiaoDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<LingLiao> queryLingLiaosByPage(HashMap map) {
        return lingLiaoDao.queryLingLiaosByPage(map);
    }

    @Override
    public boolean dealLingLiao(LingLiao lingLiao, Integer a01_id) {
        return lingLiaoDao.dealLingLiao(lingLiao, a01_id);
    }

    @Override
    public int queryDetailRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from LingLiaoDetail where qy_id=?";
        if (map.containsKey("xmd_id")) {
                sql += " and xmd_id = ?";
                parameters.add(map.get("xmd_id"));
            }
        if (map.containsKey("wzmc")) {
            sql += " and wzmc like ?";
            parameters.add("%" + map.get("mc") + "%");
        }
        return lingLiaoDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<LingLiaoDetail> queryLingLiaoDetailsByPage(HashMap map) {
        return lingLiaoDao.queryLingLiaoDetailsByPage(map);
    }

    @Override
    public List<LingLiaoDetail> getLingLiaoDetailTop100(LingLiaoDetail detail) {
        return lingLiaoDao.queryLingLiaoDetailsTop100(detail);
    }

}
