/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.lb.lbstore.service.impl;

import com.lb.lbstore.dao.KuCunDao;
import com.lb.lbstore.domain.KuCun;
import com.lb.lbstore.service.KuCunService;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Administrator
 */
@Service("kuCunServiceImpl")
public class KuCunServiceImpl implements KuCunService {

    @Autowired
    private KuCunDao kuCunDao;

    @Override
    public KuCun getKuCunById(Integer id) {
        return (KuCun) kuCunDao.getKuCunById(id);
    }

    @Override
    public boolean updateKuCun(KuCun kuCun) {
        return kuCunDao.updateKuCun(kuCun);
    }

    @Override
    public boolean deleteKuCun(Integer id) {
        return kuCunDao.deleteObjById("kuCun", id);
    }

    @Override
    public int queryRows(HashMap map) {
        List parameters = new ArrayList();
        parameters.add(map.get("qy_id"));
        String sql = "select count(1) from KuCun where qy_id=?";
        if (map.containsKey("wzmc")) {
            sql += " and wzmc like ?";
            parameters.add("%" + map.get("wzmc") + "%");
        }
        if (map.containsKey("txm")) {
            sql += " and txm like ?";
            parameters.add("%" + map.get("txm") + "%");
        }
        if (map.containsKey("xhgg")) {
            sql += " and xhgg like ?";
            parameters.add("%" + map.get("xhgg") + "%");
        }
        if (map.containsKey("wzlb_id")) {
            sql += " and wzlb_id = ?";
            parameters.add(map.get("wzlb_id"));
        }
        if (map.containsKey("rkr_id")) {
            sql += " and rkr_id = ?";
            parameters.add(map.get("rkr_id"));
        }
        if (map.containsKey("ck_id")) {
            sql += " and ck_id = ?";
            parameters.add(map.get("ck_id"));
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
            sql += " and rksj >= ?";
            parameters.add(map.get("qrq"));
        }
        if (map.containsKey("zrq")) {
            sql += " and rksj <= ?";
            parameters.add(map.get("zrq") + " 23:59:59");
        }
        if (map.containsKey("qsl")) {
            sql += " and syl >= ?";
            parameters.add(map.get("qsl"));
        }
        if (map.containsKey("zsl")) {
            sql += " and syl <= ?";
            parameters.add(map.get("zsl"));
        }
        if (map.containsKey("lqq")) {
            sql += " and datediff(bzrq,now()) <= ?";
            parameters.add(map.get("lqq"));
        }
        return kuCunDao.getCount(sql, parameters.toArray());
    }

    @Override
    public List<KuCun> queryKuCunsByPage(HashMap map) {
        return kuCunDao.queryKuCunsByPage(map);
    }

    @Override
    public List<KuCun> getKuCunTop100(KuCun kuCun) {
        return kuCunDao.queryKuCunsTop100(kuCun);
    }

    @Override
    public List<KuCun> getYlKuCunTop100(KuCun kuCun) {
        return kuCunDao.queryYlKuCunsTop100(kuCun);
    }

}
